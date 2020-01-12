const path = require('path');
const express = require('express');
const xss = require('xss');
const FoldersService = require('./foldersService');

const foldersRouter = express.Router();
const jsonParser = express.json();

function serializeFolder(folder) {
  return {
    id: folder.id,
    folder_name: xss(folder.folder_name),
    note_id: xss(folder.note_id),
    date_last_modified: folder.date_last_modified,
  };
}

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    FoldersService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders.map(serializeFolder));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { folder_name, note_id } = req.body;
    const newFolder = { folder_name, note_id };

    for (const [key, value] of Object.entries(newFolder))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    FoldersService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(folder);
      })
      .catch(next);
  });

foldersRouter
  .route('/:folder_id')
  .all((req, res, next) => {
    FoldersService.getById(
      req.app.get('db'),
      req.params.folder_id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: 'Folder does not exist' }
          });
        }
        res.folder = folder;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeFolder(res.folder));
  })
  .patch(jsonParser, (req, res, next) => {
    const { folder_name, note_id } = req.body;
    const folderToUpdate = { folder_name, note_id };

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: 'Request body must content either \'folder_name\' or \'note\''
        }
      });

    FoldersService.updateFolder(
      req.app.get('db'),
      req.params.folder_id,
      folderToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = foldersRouter;
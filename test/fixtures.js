function makeNotesArray() {
  return [
    {
      id: 1,
      note_name: 'First note',
      content: 'First content',
      date_modified: '2020-01-12T00:00:00.000Z'
    },
    {
      id: 2,
      note_name: 'Second note',
      content: 'Second content',
      date_modified: '2020-01-12T00:00:00.000Z'
    },
    {
      id: 3,
      note_name: 'Third note',
      content: 'Third content',
      date_modified: '2020-01-12T00:00:00.000Z'
    },
  ];
}

function makeMaliciousNote() {
  const maliciousNote = {
    id: 911,
    note_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: 'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
    date_modified: '2020-01-12T00:00:00.000Z'
  };
  const expectedNote = {
    ...maliciousNote,
    note_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: 'Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.'
  };
  return {
    maliciousNote,
    expectedNote,
  };
}


function makeFoldersArray() {
  return [
    {
      id: 1,
      folder_name: 'Folder1',
      note: 1,
      date_modified: '2020-01-12T00:00:00.000Z'
    },
    {
      id: 2,
      folder_name: 'Folder2',
      note: 2,
      date_modified: '2020-01-12T00:00:00.000Z'
    },
    {
      id: 3,
      folder_name: 'Folder3',
      note: 3,
      date_modified: '2020-01-12T00:00:00.000Z'
    },
  ];
}

function makeMaliciousFolder() {
  const maliciousFolder = {
    id: 911,
    folder_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    note: 911,
    date_modified: '2020-01-12T00:00:00.000Z'
  };
  const expectedFolder = {
    ...maliciousFolder,
    folder_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
  };
  return {

    maliciousFolder,
    expectedFolder,
  };
}

module.exports = {
  makeNotesArray,
  makeMaliciousNote,
  makeFoldersArray,
  makeMaliciousFolder
}
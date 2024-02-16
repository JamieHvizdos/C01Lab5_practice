test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});


test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(0);
});


test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  expect(postNoteRes.status).toBe(200);
  expect(postNoteRes2.status).toBe(200);

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const getAllNotesBody = await getAllNotesRes.json();
  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);
});


test("/deleteNote - Delete a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const insertedNote = await postNote.json();
  const noteId = insertedNote.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
  });
  expect(postNote.status).toBe(200);

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);

});

test("/patchNote - Patch with content and title", async () => {
  //POST A NOTE FIRST
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  expect(postNote.status).toBe(200);

  //GET NOTE ID HERE

  const insertedNote = await postNote.json();
  const noteId = insertedNote.insertedId;

  //PATCH THE NOTE
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "new title",
      content: "new content",
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});


test("/patchNote - Patch with just title", async () => {
  //POST A NOTE FIRST
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  expect(postNote.status).toBe(200);

  //GET NOTE ID HERE

  const insertedNote = await postNote.json();
  const noteId = insertedNote.insertedId;

  //PATCH THE NOTE
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "new title"
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  //POST A NOTE FIRST
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  expect(postNote.status).toBe(200);

  //GET NOTE ID HERE

  const insertedNote = await postNote.json();
  const noteId = insertedNote.insertedId;

  //PATCH THE NOTE
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "new content"
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  const clear = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  expect(postNote.status).toBe(200);

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const data = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(data.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  for (let i = 0; i < 3; i++) {
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  }
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const data = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(data.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const clear = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNote = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  //Get Note ID of posted note
  const insertedNote = await postNote.json();
  const noteId = insertedNote.insertedId;

  const color = '#FF0000'

  const colorRes = await fetch(`http://localhost:4000/updateNoteColor/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color }),
  });
  const colorBody = await colorRes.json();
  expect(colorRes.status).toBe(200);
  expect(colorBody.message).toBe('Note color updated successfully.');
});


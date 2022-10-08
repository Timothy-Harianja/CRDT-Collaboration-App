const Automerge = require("automerge");

let initialState = { todo: [] };

let doc1 = Automerge.from(initialState);
doc1 = Automerge.change(doc1, "Adding eat chicken", (doc) => {
  doc.todo.push({
    title: "Eat Chicken",
    done: "false",
  });
});

let doc2 = Automerge.init();
doc2 = Automerge.merge(doc2, doc1);

doc2 = Automerge.change(doc2, "Adding watch TV", (doc) => {
  doc.todo.push({
    title: "Watch TV",
    done: "false",
  });
});

doc2 = Automerge.change(doc2, "Adding play video games", (doc) => {
  doc.todo.push({
    title: "play video games",
    done: "false",
  });
});

let doc3 = Automerge.init();
doc3 = Automerge.merge(doc3, doc1);

doc3 = Automerge.change(doc3, "Adding Play Basketball", (doc) => {
  doc.todo.push({
    title: "Play Basketball",
    done: "false",
  });
});

doc3 = Automerge.change(doc3, "Adding swim", (doc) => {
  doc.todo.push({
    title: "Swim",
    done: "false",
  });
});

// doc1 = Automerge.merge(doc1, doc2);
// doc1 = Automerge.merge(doc1, doc3);
// doc2Changes = Automerge.getChanges(doc1, doc2);

// testDoc = Automerge.merge(doc3, doc2);

// console.log(doc1);
// console.log(doc2);
// console.log(doc3);
// console.log(testDoc);
// console.log(doc2Changes);

// let doc2history = Automerge.getHistory(doc2);
// for (let i = 0; i < doc2history.length; i++) {
//   console.log(doc2history[i].change);
//   console.log(doc2history[i].snapshot);
// }

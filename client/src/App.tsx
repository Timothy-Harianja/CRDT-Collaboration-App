import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Automerge, { BinaryDocument } from "automerge";
import "./App.css";
import localforage from "localforage";
import { ticketStatus, ticketType, Ticket, JiraBoard } from "./model/ticket";

const ENDPOINT = "http://127.0.0.1:4000";

let docID = "1234";
let doc: JiraBoard = Automerge.init();
doc = Automerge.change(doc, (doc: JiraBoard) => {
  if (!doc.tickets) doc.tickets = [];
});

const socket = io(ENDPOINT);
socket.on("connect", () =>
  console.log("user id of " + socket.id + " has connected")
);
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});

localforage.clear();

function App() {
  const [jiraBoard, setJiraBoard] = useState(doc);

  // useEffect(() => {
  //   const socket = io(ENDPOINT);
  //   socket.on('connect', ()=> console.log('user id of ' + socket.id + ' has connected'))
  //   socket.on('connect_error', ()=>{
  //     setTimeout(()=>socket.connect(),5000)
  //   })
  // } ,[])

  // useEffect(() => {
  //   console.log("send jiraBoard update");
  //   socket.emit("JiraBoard Update", jiraBoard);
  // }, [jiraBoard]);

  

  useEffect(() => {
    let loadDoc = async () => {
      try {
        let binary: BinaryDocument | null = await localforage.getItem(docID);
        if (binary) {
          doc = Automerge.load(binary);
          setJiraBoard(doc);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDoc();
  }, []);

  let createTicket = (
    id: string,
    title: string,
    description: string,
    status: ticketStatus,
    type: ticketType
  ) => {
    let newDoc = Automerge.change(doc, (doc: JiraBoard) => {
      if (!doc.tickets) doc.tickets = [];
      doc.tickets.push({
        id,
        title,
        description,
        status,
        type,
      });
    });
    updateDoc(newDoc);
  };

  function updateDoc(newDoc: JiraBoard) {
    doc = newDoc;
    setJiraBoard(newDoc);
    let binary = Automerge.save(newDoc);
    localforage.setItem(docID, binary).catch((err) => console.log(err));
  }

  let renderDoc = (jiraBoard: JiraBoard) => {
    return jiraBoard.tickets.map((item: Ticket, index) => {
      return (
        <div key={index}>
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() =>
            createTicket(
              "123",
              "Timothy",
              "Awesome",
              ticketStatus.ToDo,
              ticketType.Story
            )
          }
        >
          Create Ticket
        </button>
        {renderDoc(jiraBoard)}
      </header>
    </div>
  );
}

export default App;

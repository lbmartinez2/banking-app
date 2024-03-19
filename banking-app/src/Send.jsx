import React, { useState, useEffect } from "react";

function Send() {
    const local = JSON.parse(localStorage.getItem('users')) || [];

    const [sendID, setSendID] = useState('');
    const [receiveID, setReceiveID] = useState('');
    const [showSend, setSend] = useState(false);
    const [balanceInput, setBalanceInput] = useState(0);
    const [retrievedUsers, setRetrievedUsers] = useState(local);


// useEffect(() => {
//     console.log(retrievedUsers);
// }, [retrievedUsers])

  const send = () => {
    setSend(!showSend);
  }
  const sendIDInput = (e) => {
    setSendID(e.target.value);
  }
  const handleAmountInput = (e) => {
    setBalanceInput(e.target.value);
  }
  const receiveIDInput = (e) => {
    setReceiveID(e.target.value);
  }


  const confirmSend = () => {
    const userSend = retrievedUsers.find(
      (user) => String(user.id) === String(sendID.trim())
    );
    const userReceive = retrievedUsers.find(
      (user) => String(user.id) === String(receiveID.trim())
    );

    if (userSend && userReceive) {
      const updatedUsers = retrievedUsers.map((user) => {
        if (String(user.id) === String(sendID).trim()) {
          return { ...user, balance: Number(user.balance) - Number(balanceInput) };
        } else if (String(user.id) === String(receiveID).trim()) {
          return { ...user, balance: Number(user.balance) + Number(balanceInput) };
        } else {
          return user;
        }
      });

      const userStringJSON = JSON.stringify(updatedUsers);
      localStorage.setItem("users", userStringJSON);
      setRetrievedUsers(updatedUsers);
      setSend(false);
      setBalanceInput(0);
      setSendID("");
      setReceiveID("");
      console.log(updatedUsers);
    }
  };
  return (
      <div>
      <button onClick={send}>Send</button>
        {showSend ? (
          <>
            <input
              type="text"
              placeholder="Enter sender id"
              onChange={sendIDInput}
              value={sendID}
            />
            <input
              type="text"
              placeholder="Enter balance"
              onChange={handleAmountInput}
              value={balanceInput}
            />
            <input
              type="text"
              placeholder="Enter receiver id"
              onChange={receiveIDInput}
              value={receiveID}
            />
            <button
              onClick={() =>
                confirmSend()
              }
            >
              Confirm
            </button>
          </>
        ) : null}
      </div>
  );
}

export default Send;

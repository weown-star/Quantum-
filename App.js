import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';

const App = () => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const tg = window.Telegram.WebApp;
      tg.expand();
      const telegramId = tg.initDataUnsafe.user.id;
      const name = tg.initDataUnsafe.user.first_name;

      const { data, error } = await supabase
        .from('users')
        .upsert({ telegram_id: telegramId, name })
        .select()
        .single();

      if (data) setUser(data);
    };

    fetchUser();
  }, []);

  const handleDeposit = async () => {
    if (!amount) return;
    await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'deposit',
      amount: parseFloat(amount)
    });
    setAmount("");
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select("*")
      .eq("user_id", user.id);
    setTransactions(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Quantum Profits</h1>
      {user && <p>Welcome, {user.name}</p>}
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <h3>Transactions</h3>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>{tx.type}: ${tx.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
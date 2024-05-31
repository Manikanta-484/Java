let balances = {};

function addExpense() {
    const person = document.getElementById('person').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (person && !isNaN(amount)) {
        balances[person] = (balances[person] || 0) + amount;
        updateBalances();
        document.getElementById('person').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter a valid person and amount.');
    }
}

function updateBalances() {
    const balancesDiv = document.getElementById('balances');
    balancesDiv.innerHTML = '';

    const total = Object.values(balances).reduce((acc, val) => acc + val, 0);
    const average = total / Object.keys(balances).length;

    for (const [person, amount] of Object.entries(balances)) {
        const balance = amount - average;
        const balanceText = balance > 0 ? 'should receive' :
                            balance < 0 ? 'should pay' :
                            'is settled';
        const balanceClass = balance > 0 ? 'owed' :
                             balance < 0 ? 'owe' :
                             'settled';

        const paid = amount;
        const div = document.createElement('div');
        div.classList.add('balance', balanceClass);
        div.textContent = `${person} ${balanceText} $${Math.abs(balance).toFixed(2)}, paid $${paid.toFixed(2)}`;
        balancesDiv.appendChild(div);
    }
}



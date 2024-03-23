let usersData = [];

for (let i = 0; i < 5; i++) {
    usersData.push({
        name: prompt("Enter your name"),
        phone: prompt("Enter your phone number"),
        position: prompt("Enter your posiion"),
    });
}

localStorage.setItem("users", JSON.stringify(usersData));

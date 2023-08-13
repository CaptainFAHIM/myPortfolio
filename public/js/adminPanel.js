const adminBtn = document.querySelector(".admins");
const messagesBtn = document.querySelector(".messages");
const adminContent = document.querySelector(".admin-content");
const messageContent = document.querySelector(".message-content");
const logoutBtn = document.querySelector(".logout-btn");

adminBtn.addEventListener("click", () => {
    if(!messageContent.classList.contains("hide")){
        messageContent.classList.add("hide");
    }
    if(adminContent.classList.contains("hide")){
        adminContent.classList.remove("hide");
    }
    
});

messagesBtn.addEventListener("click", () => {
    if(!adminContent.classList.contains("hide")){
        adminContent.classList.add("hide");
    }
    if(messageContent.classList.contains("hide")){
        messageContent.classList.remove("hide");
    }
});

logoutBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("/logout",{ method: "POST",headers: {
            'Content-Type': 'application/json',
          }});
    if(response.status === 200){
        window.location.href = '/admin';
    }
    else{
        console.error('Logout failed');
    }
    } catch (error) {
        console.log(error.message);
    }
    
});
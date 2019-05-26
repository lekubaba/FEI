try{

　　top.location.hostname;

　　if (top.location.hostname != window.location.hostname) {

　　　　top.location.href =window.location.href;

　　}

}

catch(e){

　　top.location.href = window.location.href;

}
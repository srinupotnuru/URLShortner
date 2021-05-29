var config = {
  
  apiKey: "AIzaSyCxTHYADPh8vbN4cYw9YMB4tvvi_d7VXmg",
  authDomain: "codelabs-4373c.firebaseapp.com",
  databaseURL: "https://codelabs-4373c-default-rtdb.firebaseio.com",
  projectId: "codelabs-4373c",
  storageBucket: "codelabs-4373c.appspot.com",
  messagingSenderId: "835368477952",
  appId: "1:835368477952:web:f0a339b55b5dc460bdffe5",
  measurementId: "G-9KHLDL9H2H"
};
firebase.initializeApp(config);


function copyToClipboard(text) {  
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
function pass(url)
{
    fetch("/short",{
        method:"POST",
        body:JSON.stringify({url}),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
    })
    .then((response) => response.json()).then((data)=>{
        let url=window.location.href+data["result"];
        document.getElementById('output').innerHTML=url;
        copyToClipboard(url);
        const ref_obj = firebase.database().ref('paste/' + data["result"]);
        ref_obj.set({
        "url":url,
      }).then(function () {
         console.log("push done");
      });
    });
}
function shortit()
{
      var url=document.getElementById('url').value;
      if(valid(url))
      {
        pass(url);
      }
      else{
          window.alert("Enter a Valid URL");
      }
}
function valid(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
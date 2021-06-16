window.onload = function(){
    var inputBtn = document.getElementById("inputBtn");
    inputBtn.onclick = addToList;
};
function addToList(){
    var input = document.getElementById("input").value;
    var inputNode =  document.createTextNode(input);
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.textContent = "Delete"
    btn.onclick = function(e){
        var target = e.target;
        var li = target.parentNode;
        li.parentNode.removeChild(li);
    }
    
    li.appendChild(inputNode);
    li.appendChild(btn);
    var list = document.getElementById("todoList");
    list.appendChild(li);
}
function handleOnClick(e){
    var target = e.target;
    var li = target.parentNode;
    li.parentNode.removeChild(li);
}
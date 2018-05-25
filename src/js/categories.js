var cntCategories = document.getElementById("cntCategories");
var btnCategories = document.getElementById("btnSelectCategory");
var numPads = document.getElementById("cntNumbers");
function AddCategories()
{
    for(let i=0; i< categoryList.length; i++)
    {
        let catSelector = document.createElement("div");
        catSelector.classList.add("dropDownCategory");
        catSelector.innerHTML = categoryList[i].name;
        catSelector.style.backgroundColor = categoryList[i].color;
        cntCategories.appendChild(catSelector);
    }
    cntCategories.style.display = "none";    
    btnCategories.addEventListener("mouseup", showCategories);
}
function showCategories()
{
    if(cntCategories.style.display === "block")
    {
        cntCategories.style.display = "none";
        numPads.style.display = "block";
        window.removeEventListener("mouseup", closeCategories);
    }
    else
    {
        cntCategories.style.display = "block";
        numPads.style.display = "none";
        window.addEventListener("mouseup", closeCategories);
    }
}
function closeCategories(event)
{
    if (!event.target.matches('.btnSelectCategory'))
    {
        cntCategories.style.display = "none";
        numPads.style.display = "block";
        btnCategories.addEventListener("mouseup", showCategories);
    }
    if(event.target.matches('.dropDownCategory'))
    {
        btnSelectCategory.innerHTML = event.target.innerHTML;
        btnSelectCategory.style.color = "#fff";
        btnSelectCategory.style.backgroundColor = event.target.style.backgroundColor;
    }
}
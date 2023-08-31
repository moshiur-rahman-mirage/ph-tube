
// Category Buttons Load and Display

const loadCategory= async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories=data.data;
    displayCategory(categories);
}

const displayCategory=(categories)=>{
    const categoryContainer=document.getElementById('cat-container');
    categoryContainer.innerHTML='';
    categories.forEach(category => {
        const categoryButton=document.createElement('button');
       categoryButton.classList=`btn bg-[rgba(37, 37, 37, 0.2)] text-gray-900`;
       categoryButton.innerHTML=`${category.category}`;
       categoryContainer.appendChild(categoryButton);
    });
}




loadCategory();
const banner=document.getElementById('welcome-banner');
window.addEventListener('scroll',()=>{if(window.scrollY>100){banner.style.display='none';}});

const cartBtn=document.getElementById('cart-btn');
const cartPanel=document.getElementById('cart-panel');
const closeCart=document.getElementById('close-cart');
const cartItemsContainer=document.getElementById('cart-items');
const cartCount=document.getElementById('cart-count');
const cartTotal=document.getElementById('cart-total');
let cart=JSON.parse(localStorage.getItem('cart')||'[]');
function saveCart(){localStorage.setItem('cart',JSON.stringify(cart));}
function updateCart(){
 cartItemsContainer.innerHTML='';
 let total=0;
 cart.forEach((item,index)=>{
  const div=document.createElement('div');
  div.classList.add('cart-item','d-flex','align-items-center','justify-content-between','mb-2');
  div.innerHTML=`<div class='d-flex align-items-center'>
   <img src='${item.img}' class='cart-thumb me-2'><div>${item.name} (x${item.qty})</div></div>
   <div><span>$${(item.price*item.qty).toLocaleString()}</span>
   <button class='btn btn-sm btn-outline-light ms-2' onclick='changeQty(${index},-1)'>-</button>
   <button class='btn btn-sm btn-outline-light' onclick='changeQty(${index},1)'>+</button></div>`;
  cartItemsContainer.appendChild(div);
  total+=item.price*item.qty;
 });
 cartCount.textContent=cart.reduce((s,i)=>s+i.qty,0);
 cartTotal.textContent='Total: $'+total.toLocaleString();
 saveCart();
}
function changeQty(index,delta){cart[index].qty+=delta;if(cart[index].qty<=0)cart.splice(index,1);updateCart();}
document.querySelectorAll('.add-to-cart').forEach(btn=>{
 btn.addEventListener('click',()=>{
  const name=btn.dataset.name,price=parseInt(btn.dataset.price),img=btn.dataset.img;
  const existing=cart.find(i=>i.name===name);
  if(existing)existing.qty++;else cart.push({name,price,img,qty:1});
  updateCart();
 });
});
document.getElementById('clear-cart').onclick=()=>{cart=[];updateCart();};
document.getElementById('checkout').onclick=()=>{
 if(cart.length===0)return alert('Tu carrito está vacío');
 let msg='Hola! Deseo comprar los siguientes productos:%0A';
 cart.forEach(i=>msg+=`- ${i.name} (x${i.qty})%0A`);
 let total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 msg+=`Total: $${total.toLocaleString()}`;
 window.open('https://wa.me/573043792516?text='+msg,'_blank');
};
cartBtn.onclick=()=>cartPanel.classList.add('open');
closeCart.onclick=()=>cartPanel.classList.remove('open');
updateCart();



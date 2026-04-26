import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function useCart(){
    return useContext(CartContext)
}
export function CartProvider({ children}){
    const [items, setItems] = useState([])
    function add(product){
        setItems((prev)=>{
            const found = prev.find((i)=>i.id === product.id)
            if (found) return prev.map((i)=>i.id === product.id ? { ...i, qty: i.qty+1} : i)
                return [...prev, {...product, qty : 1}]

        })
    }
    function remove(id){
        setItems((prev)=> prev.filter((i) => i.id !== id))
    }
    function updateQty(id, qty){
        if(qty<1){remove(id);return}
        setItems((prev)=> prev.map((i)=>i.id === id ?{...i,qty} : i))

    }
    function clear(){
        setItems([])
    }
    const total = items.reduce((s,i) => s + i.price * i.qty, 0)
    const count = items.reduce((s,i) => s + i.qty, 0)
    return(
        <CartContext.Provider value ={{ items,add, remove,updateQty,clear,total,count}}>
            {children}
        </CartContext.Provider>
    )
}
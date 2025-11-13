import React, { useEffect, useState } from 'react'

const ShopOwnerForm = ({fetchShopOwners,editingShopOwner,setEditingShopOwner}) => {
const [shopOwnerId, setShopOwnerId] = useState(0); // int
const [shopOwnerName, setShopOwnerName] = useState(""); // String
const [shopOwnerGender, setShopOwnerGender] = useState(''); // char
const [shopName, setShopName] = useState(""); // String
const [shopOwnerNumber, setShopOwnerNumber] = useState(0); // long
const [shopLocation, setShopLocation] = useState(""); // String
const [shopType, setShopType] = useState(""); // Retailer/wholesale

useEffect(()=>{
    if(editingShopOwner){
        setShopLocation(editingShopOwner.shopLocation);
        setShopName(editingShopOwner.shopName);
        setShopOwnerGender(editingShopOwner.shopOwnerGender);
        setShopOwnerId(editingShopOwner.shopOwnerId);
        setShopOwnerNumber(editingShopOwner.shopOwnerNumber);
        setShopOwnerName(editingShopOwner.shopOwnerName);
        setShopType(editingShopOwner.shopType);
    }
    else{
        setShopLocation("");
        setShopName("");
        setShopOwnerGender("");
        setShopOwnerId("");
        setShopOwnerName("");
        setShopOwnerNumber("")
        setShopType("");
    }
},[editingShopOwner]
);

const handleSubmit = async (e)=>{
    e.preventDefault();
    const shopOwner = {shopOwnerId,shopOwnerName,shopOwnerGender,shopName,shopOwnerNumber,shopLocation,shopType}

    try{
        if(editingShopOwner){
          await fetch(`http://localhost:8080/shopownerservice/${shopOwnerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shopOwner),
        });
        }
        else{
            await fetch("http://localhost:8080/shopownerservice",{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(shopOwner),
            });
        }
        fetchShopOwners();
        setEditingShopOwner(null);
        setShopLocation("");
        setShopName("");
        setShopOwnerGender("");
        setShopOwnerId("");
        setShopOwnerName("");
        setShopOwnerNumber("")
        setShopType("");
    }
    catch(e){
        console.error("error: ",e);
    }
};  
  return (
    <div
    >
        <h2>{editingShopOwner?"edit shop owner":"add shop owner"}</h2>
        
        <form 
        className='form-objects'
        onSubmit={handleSubmit}>
            
            <input
            type='number'
            className='input-field'
            value={shopOwnerId}
            onChange={(e)=>setShopOwnerId(e.target.value)}
            placeholder='Shop owner Id:'
            required
            disabled={editingShopOwner}
            /><br/>

            <input className='input-field'
            type="text"
            value={shopOwnerName}
            onChange={(e) => setShopOwnerName(e.target.value)}
            placeholder="Shop owner Name"
            required
            /><br/>

            <input
            type="text"
            className='input-field'
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Shop Name"
            required
            /><br/>

            <input
            type="text"
            className='input-field'
            value={shopOwnerGender}
            onChange={(e) => setShopOwnerGender(e.target.value)}
            placeholder="Shop owner gender"
            required
            /><br/>

            <input
            type="text"
            className='input-field'
            value={shopOwnerNumber}
            onChange={(e) => setShopOwnerNumber(e.target.value)}
            placeholder="Shop owner number"
            required
            /><br/>

            <input
            type="text"
            value={shopLocation}
            className='input-field'
            onChange={(e) => setShopLocation(e.target.value)}
            placeholder="Shop Location"
            required
            /><br/>

            <input
            type="text"
            value={shopType}
            className='input-field'
            onChange={(e) => setShopType(e.target.value)}
            placeholder="Shop type"
            required
            /><br/>

            <button type='submit'>{editingShopOwner?"update shop owner":"Add shop owner"}</button>
        </form>
    </div>
  );
};

export default ShopOwnerForm
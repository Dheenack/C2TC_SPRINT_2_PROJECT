import React from 'react'

const ShopOwnerList = ({shopOwners,fecthShopOwners,setEditingShopOwner}) => {
    const handleDelete = async(id)=>{
        try{
            await fetch(`http://localhost:8080/shopownerservice/${id}`, { method: 'DELETE' });
            fecthShopOwners();
        }
        catch(e){
            console.log("Error while deleting:",e);
        }
    };

  return (
    <div>
        <h2>Shop Owners List</h2>
        {shopOwners.length===0 ? (
            <p>No customers available</p>
        ):
        (
            <div className='card-container'>
                {
                    shopOwners.map((shopOwner)=>(
                        <div
                        className='card'
                        key={shopOwner.shopOwnerId}>
                            <div>
                                <h3>{shopOwner.shopOwnerName}</h3>
                                <p><strong>Shop owner Id:</strong> {shopOwner.shopOwnerId}</p>
                                <p><strong>Shop Name:</strong> {shopOwner.shopName}</p>
                                <p><strong>shop Owner Gender:</strong> {shopOwner.shopOwnerGender}</p>
                                <p><strong>shop Owner Number:</strong> {shopOwner.shopOwnerNumber}</p>
                                <p><strong>Shop Location:</strong> {shopOwner.shopLocation}</p>
                                <p><strong>Shop Type:</strong> {shopOwner.shopType}</p>

                            </div>
                            <div>
                                <button onClick={()=>setEditingShopOwner(shopOwner)}>
                                    Edit
                                </button>
                                <button onClick={()=>handleDelete(shopOwner.shopOwnerId)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    </div>
  );
};

export default ShopOwnerList
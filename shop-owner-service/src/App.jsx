import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import ShopOwnerForm from './components/ShopOwnerForm'
import ShopOwnerList from './components/ShopOwnerList'

function App() {
  const [count, setCount] = useState(0)
  const [shopOwners,SetShopOwners] = useState([]);
  const [editingShopOwner,setEditingShopOwner] = useState(null);

  useEffect(() => {
    fetchShopOwners();
  }, []);

  const fetchShopOwners =async () =>{
    try{
      const response = await fetch('http://localhost:8080/shopownerservice');
      const data = await response.json();
      SetShopOwners(data);
    }
    catch(e){
      console.log("Error fetching shop owners",e);
    }
  };

  return (
    <>
      <div>
        <h1>Shop Owners management system</h1>
        <ShopOwnerForm
        fetchShopOwners={fetchShopOwners}
        editingShopOwner={editingShopOwner}
        setEditingShopOwner={setEditingShopOwner}
        />
        <div className='list'>

        <ShopOwnerList
        shopOwners={shopOwners}
        fecthShopOwners={fetchShopOwners}
        setEditingShopOwner={setEditingShopOwner}
        />
        </div>
      </div>
    </>
  )
}

export default App

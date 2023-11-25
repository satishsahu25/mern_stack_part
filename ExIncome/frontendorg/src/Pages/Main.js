import React, { useMemo, useState } from 'react'
import { MainLayout } from '../styles/Layouts'
import Orb from '../components/Orb/Orb'
import Navigation from '../components/Navigation/Navigation'
import Dashboard from '../components/Dashboard/Dashboard'
import Expenses from '../components/Expenses/Expenses'
import Income from '../components/Income/Income'
import './main.css'



function Main() {
  const [active,setActive]=useState(1);

  const displayData=()=>{
    switch(active){
      case 1:
        return <Dashboard/> 
      case 2:
        return <Dashboard/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
    }
  }

  const orbMemo=useMemo(()=>{
    return <Orb/>
  },[]);



  return (
    <div className="appstyle app">
    {orbMemo}
      <MainLayout>
       <Navigation active={active} setActive={setActive}/>
        {displayData()}
      </MainLayout>
    </div>
  )
}




export default Main

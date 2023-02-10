import React from 'react'
import AddUser from '../components/admin/AddUser'
import Header from '../components/admin/Header'

function AdminAddUser() {
  return (
    <div style={{ height: '100vh' }}>
        <Header/>
        <AddUser/>
    </div>
  )
}

export default AdminAddUser
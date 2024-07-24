import React from 'react'
import SidePanel from '../../components/admin/SidePanel'
import DashboardContent from '../../components/admin/DashboardContent'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <SidePanel />
      <div className="flex-grow">
        <DashboardContent />
      </div>
    </div>
  )
}

export default Dashboard
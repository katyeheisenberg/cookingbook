import React from 'react'

import Head from './head'
import Header from './header'
import InputPanel from './common/input'
import Table from './common/table'

const Main = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-bl from-fuchsia-900 to-purple-500">
      <Head title="Main" />
      <Header />
      <InputPanel />
      <Table />
    </div>
  )
}

export default Main

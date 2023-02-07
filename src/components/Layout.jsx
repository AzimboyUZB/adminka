import { FileOutlined, PieChartOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../helpers/routes';
const { Sider } = Layout;
function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label,
    path
  }
}
const items = [
  getItem('Asossiy', '1', <PieChartOutlined />, "/"),
  getItem('Maxsulot', '2', <UserOutlined />, "/products"),  
  getItem('Katigoria', '3', <FileOutlined />, "/categories"),
  getItem('Atribut', '4', <FileOutlined />, "/atribute"),
  getItem('Brend', '5', <FileOutlined />, "/brand"),
  getItem('Banner', '6', <FileOutlined />, "/banner"),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const [activeMenukey, setActiveMenukey] = useState('1')
  const {pathname} = useLocation()

  const menuItemHandler = (e) => {
    const {path} = e.item.props
    navigate(path)
  }

  function isSelectedMenuItem(path, key) {     
      if (path === pathname) {
        setActiveMenukey(key)
      }
  }

  useEffect(() => {
    items.forEach((item) => {
      isSelectedMenuItem(item.path, item.key)
    })
  }, [pathname])

  return (
    <Layout
      style={{
        minHeight: '100vh',
        paddingTop: '60px'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu 
          onClick={menuItemHandler}
          defaultSelectedKeys={[activeMenukey]} 
          theme="dark" 
          mode="inline" 
          items={items} />
      </Sider>
      <Layout className="site-layout">
        <Routes>
          {routes.map((route) => {
            return <Route
              path={route.path}
              key={route.id}
              element={route.component}
            />
          })}
        </Routes>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
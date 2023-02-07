import { Card, Row } from 'antd'
import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoad } from '../hooks/request'
import { bradndListUrl } from '../helpers/urls'
import { FullPageLoader } from '../components/FullPageLoader'
import Modal from 'antd/es/modal/Modal'

const { Meta } = Card;

function BrandPage() {
  const { response, loading, request } = useLoad({ url: bradndListUrl })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddBtn = () => {
    setIsModalOpen(true)
  }

  console.log(response);
  return (
    <>
      <PageHeader title='Brendlar' btnTitle='Brend qoshish' handleClick={handleAddBtn} />

      <Row className='container' justify='space-between'>
        {loading ? (
          <FullPageLoader />
        ) : (
          response?.brands?.map((item) => (
            <Card 
              key={item.id}
              style={{
                width: 350,
                marginBottom: 16,
              }}
              cover={<img alt="example" src={item.image} />}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key='delete' />,
              ]}
            >
              <Meta
                title={item.name_uz}
              />
            </Card>
          ))
        )}
      </Row>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default BrandPage
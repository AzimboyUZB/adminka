import { Button, Form, Input, List, message, Modal, Row, Select, Space } from 'antd'
import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { categoriesListUrl, categoryAddUrl, getCategoryDeleteUrl, getCategoryUpdateUrl } from '../helpers/urls'
import { useDeleteRequest, useLoad, usePostRequest, usePutRequest } from '../hooks/request'
import { Collapse } from 'antd';
import { Spin } from 'antd';
import { catchSelectedCategory, deleteProps, generateCategoriesList, slugify } from '../helpers/helpers'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const initialCategoryData = {
  isEdit: false,
  id: null,
  slug: '',
  name_uz: '',
  name_ru: '',
  catImage: '',
  parent_id: 0,
}

function CatedoriesPage() {
  const { loading, response, request } = useLoad({ url: categoriesListUrl })
  const categorePostRequest = usePostRequest({ url: categoryAddUrl })
  const categoreDeleteRequest = useDeleteRequest()
  const categoreEditRequest = usePutRequest()
  const [categoreData, setCategoreData] = useState(initialCategoryData)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleFinish = async (e) => {
    const { name_uz } = deleteProps(categoreData, ['id', 'isEdit'])
    const posted_data = {
      ...deleteProps(categoreData, ['id', 'isEdit']),
      slug: slugify(name_uz),
    }

    if (categoreData.isEdit) {
      const { response, success } = await categoreEditRequest.request({
        url: getCategoryUpdateUrl(categoreData.id),
        data: posted_data,
      })
      if (success) {
        message.success('Katygoriya muofaqqiyatli yangilandi')
        setCategoreData(initialCategoryData)
        request()
      }
    } else {
      const { response, success } = await categorePostRequest.request({
        data: posted_data,
      })
      if (success) {
        console.log(response);
        message.success('Katygoriya muofaqqiyatli qo`shildi')
        request()
      }
    }
  }

  const handleChange = ({ target }) => {
    const { value, name } = target
    setCategoreData({ ...categoreData, [name]: value })
  }

  const handleEditBtn = (item) => {
    setCategoreData({
      ...categoreData,
      id: item.id,
      isEdit: true,
      name_uz: item.name_uz,
      name_ru: item.name_ru,
      parent_id: item.parent_id
    })
  }

  const handleDeleteBtn = (item) => {
    setDeleteId(item.id)
    setModalOpen(true)
  }

  const handleModalOk = async () => {
    const { success } = await categoreDeleteRequest.request({
      url: getCategoryDeleteUrl(deleteId)
    })
    if (success) {
      message.success('Katygoriya muofaqqiyatli o`chirildi')
      handleModalClose()
      request()
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setDeleteId(null)
  }

  const genExtra = (item) => (
    <Space>
      <Button
        icon={<EditOutlined />}
        onClick={() => handleEditBtn(item)}
      />
      <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteBtn(item)} />
    </Space>
  );

  return (
    <>
      <PageHeader title='Kategorialar' btnTitle='Kategoriya qoshish' />

      {loading ? (
        <Spin />
      ) : (
        <Row className='container' wrap={false}>
          <Form
            name="basic"
            layout='vertical'
            autoComplete="off"
            style={{ width: "20%" }}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Kategorya name UZ"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input value={categoreData.name_uz} name='name_uz' onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Kategorya name RU"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input value={categoreData.name_ru} name='name_ru' onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Ota kategoriyani tanlang"
              rules={[
                {
                  required: true,
                  message: 'Kategoriya nomini kiritign!',
                },
              ]}>
              <Select
                onChange={(e) =>
                  handleChange({
                    target: { value: e, name: 'parent_id' }
                  })
                }
                defaultValue={categoreData.parent_id}
                value={catchSelectedCategory(
                  response?.categories,
                  categoreData.parent_id
                )}
                options={generateCategoriesList(
                  response?.categories
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Collapse defaultActiveKey={['1']} style={{ width: "70%" }}>
            {response?.categories?.map((item) => (
              <Panel header={item.name_uz} key={item.id} extra={genExtra(item)}>
                {
                  !!item?.children?.length ? (
                    <List
                      bordered

                      dataSource={item?.children}
                      renderItem={(item) => (
                        <List.Item extra={genExtra(item)}>
                          {item.name_uz}
                        </List.Item>)}
                    />
                  ) : (
                    <p>Item content</p>
                  )
                }

              </Panel>
            ))}
          </Collapse>
        </Row>
      )}

      <Modal
        title="O`chirish"
        cancelText="Yo`q"
        okText="Ha"
        okType='danger'
        centered
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalClose}
      >
        <p>Siz rostanham o`chirishni hohlaysizmi</p>
      </Modal>
    </>
  )
}

export default CatedoriesPage
import React from 'react'
import { Logo } from '../assets/icons/index'
import { Select } from 'antd';

function Header() {
    return (
        <div className='header'>
            <div className="header__row">
                <div className="header__logo">
                    <Logo />
                </div>

                <div className="header__select">
                    <Select
                        defaultValue="uz"
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: 'uz',
                                label: 'Uzbekcha',
                            },
                            {
                                value: 'ru',
                                label: 'Ruscha',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
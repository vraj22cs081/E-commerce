import React, { useState } from 'react';
import '../css/AdminPanel.css';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isUpdateMode
            ? 'http://localhost:9000/admin/update-product'
            : 'http://localhost:9000/admin/add-product';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.error('Error response:', response.statusText);
                return;
            }

            const result = await response.text();
            alert(result);

            setFormData({
                id: '',
                name: '',
                description: '',
                price: '',
                stock: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <body className='admin-page'>
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <div className="toggle-buttons">
                <button
                    onClick={() => setIsUpdateMode(false)}
                    className={!isUpdateMode ? 'active' : ''}
                >
                    Add Product
                </button>
                <button
                    onClick={() => setIsUpdateMode(true)}
                    className={isUpdateMode ? 'active' : ''}
                >
                    Update Product
                </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                {isUpdateMode && (
                    <label>
                        Product ID:
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">
                    {isUpdateMode ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
        </body>
    );
};

export default AdminPanel;

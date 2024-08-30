import React, { useState, useEffect } from 'react';
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
    const [activeTab, setActiveTab] = useState('addProduct');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            description: '',
            price: '',
            stock: ''
        });
    };

    useEffect(() => {
        if (activeTab === 'addProduct') {
            setIsUpdateMode(false);
        } else if (activeTab === 'updateProduct') {
            setIsUpdateMode(true);
        }
    }, [activeTab]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'userInfo') {
                    const response = await fetch('http://localhost:9000/admin/users');
                    if (!response.ok) throw new Error('Failed to fetch users');
                    const data = await response.json();
                    setUsers(data);
                } else if (activeTab === 'productInfo') {
                    const response = await fetch('http://localhost:9000/admin/products');
                    if (!response.ok) throw new Error('Failed to fetch products');
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [activeTab]);

    const renderForm = () => (
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
            <button type="submit" className="submit-btn">
                {isUpdateMode ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );

    const renderUserInfo = () => (
        <div>
            <h2>Registered Users</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderProductInfo = () => (
        <div>
            <h2>All Product Information</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5">No products found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderContent = () => {
        if (activeTab === 'addProduct' || activeTab === 'updateProduct') {
            return renderForm();
        } else if (activeTab === 'userInfo') {
            return renderUserInfo();
        } else if (activeTab === 'productInfo') {
            return renderProductInfo();
        }
    };

    return (
        <div className="admin-page">
            <div className="sidebar">
                <button onClick={() => setActiveTab('addProduct')} className={activeTab === 'addProduct' ? 'active' : ''}>
                    Add Product
                </button>
                <button onClick={() => setActiveTab('updateProduct')} className={activeTab === 'updateProduct' ? 'active' : ''}>
                    Update Product
                </button>
                <button onClick={() => setActiveTab('userInfo')} className={activeTab === 'userInfo' ? 'active' : ''}>
                    User Info
                </button>
                <button onClick={() => setActiveTab('productInfo')} className={activeTab === 'productInfo' ? 'active' : ''}>
                    Product Info
                </button>
            </div>
            <div className="admin-container">
                <h1>Admin Panel</h1>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

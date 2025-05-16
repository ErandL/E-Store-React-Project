import { useLocation } from 'react-router-dom'
import "../assets/productsPage.css"

function Breadcrumb({ category }: { category: string | null }) {
    return (
        <div className="breadcrumb d-flex gap-2 mb-4">
            <span style={{ opacity: 0.6 }}>Home</span>
            <span>&gt;</span>
            <span style={{ opacity: 0.6 }}>Catalogue</span>
            {category && (
                <>
                    <span>&gt;</span>
                    <span style={{ fontWeight: 'bold' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </>
            )}
        </div>
    )
}

function ProductsBody() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const selectedCategory = queryParams.get('category')

    return (
        <div className='px-5 pt-2 pb-5'>
            <Breadcrumb category={selectedCategory} />
            <div className="products-page-body">
                <h2>{selectedCategory ? `Showing products for: ${selectedCategory}` : 'All Products'}</h2>
            </div>
        </div>
    )
}

export default ProductsBody
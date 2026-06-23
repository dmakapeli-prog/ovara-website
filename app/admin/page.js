'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('id')
    if (data) setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const toggleStock = async (product, newValue) => {
    const { error } = await supabase
      .from('products')
      .update({ stock: newValue })
      .eq('id', product.id)
    
    if (!error) {
      fetchProducts()
    } else {
      console.error("Gagal update stok:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-stone-900 mb-8 text-center">
          🥚 Admin Ovara — Kelola Stok
        </h1>

        {loading ? (
          <div className="text-center text-stone-600 font-medium">Memuat data produk...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col group border border-stone-100 hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-stone-900 mb-1">{product.name}</h3>
                  <p className="text-[#D97706] font-bold text-lg mb-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-600">Status Stok:</span>
                    <button
                      onClick={() => toggleStock(product, !product.stock)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 ${
                        product.stock ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <span className="sr-only">Toggle stok</span>
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          product.stock ? 'translate-x-9' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    {product.stock ? (
                      <span className="text-xs font-bold text-green-600">Tersedia</span>
                    ) : (
                      <span className="text-xs font-bold text-red-600">Habis</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

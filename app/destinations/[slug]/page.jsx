'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SubcategoryPageTemplate from './SubcategoryPageTemplate';

export default function SubcategoryPage() {
  const params = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/v1/subcategory-pages/by-subcategory/${params.slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Subcategory page not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setPageData(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch subcategory page');
        }
      } catch (error) {
        console.error('Error fetching subcategory page:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPageData();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2AD3F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subcategory page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <p className="text-gray-600">
            The subcategory page you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            No Data Available
          </h1>
          <p className="text-gray-600">
            No page data found for this subcategory.
          </p>
        </div>
      </div>
    );
  }

  return <SubcategoryPageTemplate pageData={pageData} />;
}





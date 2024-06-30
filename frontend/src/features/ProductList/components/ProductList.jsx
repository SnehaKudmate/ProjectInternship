import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import data from './data.json';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data); // Initialize with all products

  const filters = [
    {
      id: 'skills',
      name: 'Skills',
      options: [
        { value: 'SEO', label: 'SEO' },
        { value: 'Content Creation', label: 'Content Creation' },
        { value: 'Social Media', label: 'Social Media' },
        // Add more skills as needed
      ],
    },
    {
      id: 'tenure',
      name: 'Tenure',
      options: [
        { value: '3 months', label: '3 months' },
        { value: '6 months', label: '6 months' },
        { value: '12 months', label: '12 months' },
        // Add more tenure options as needed
      ],
    },
    {
      id: 'location',
      name: 'Location',
      options: [
        { value: 'India', label: 'India' },
        { value: 'United States', label: 'United States' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Germany', label: 'Germany' },
        { value: 'Japan', label: 'Japan' },
        { value: 'China', label: 'China' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Singapore', label: 'Singapore' },
      ],
    },
  ];

  useEffect(() => {
    const filterProducts = () => {
      const searchLower = searchTerm.toLowerCase();
      const filtered = data.filter(product => {
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
          product.tenure.toLowerCase().includes(searchLower) ||
          product.location.toLowerCase().includes(searchLower)
        );
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchTerm]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <div className="flex items-center w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here according to your requirement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            <h3 className="sr-only">Filters</h3>
            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={false}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const newSearchTerm = checked
                                  ? `${searchTerm} ${option.value}`.trim()
                                  : searchTerm.replace(option.value, '').trim();
                                setSearchTerm(newSearchTerm);
                              }}
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>

          <div className="lg:col-span-3">
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredProducts.map((product) => (
                    <Link to={`/productDetails/${product.id}`} key={product.title} className="border-solid border-2 border-gray-300 p-3">
                      <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={product.thumbnail}
                            alt={product.thumbnail}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.title}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                            <div className="mt-1 text-sm text-gray-500 flex">
                              <StarIcon className="h-6 w-6 text-yellow-500" />
                              <span className="align-bottom">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductList;

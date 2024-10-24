"use client";
import Image from "next/image";
import Link from "next/link";
// import bike_8 from "../../../../Public/images/bike-5/bike.jpg";
import { useCart } from "@/app/contexts/CartContext";

export default function Page() {
  const { cart, removeFromCart, updateQuantity, isLoading } = useCart();

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 3) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div>
      <div className='container mx-auto mt-10'>
        <div className='sm:flex shadow-md my-10'>
          <div className='  w-full  sm:w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
              <h2 className='font-semibold text-2xl'>{cart.length} Items</h2>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className='md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50'>
                <div className='md:w-4/12 2xl:w-1/4 w-full'>
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image.src}
                      alt='Black Leather Purse'
                      height={item.image.height}
                      width={item.image.width}
                      className='h-full object-center object-scale-down md:block hidden'
                    />
                  </Link>
                </div>
                <div className='md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center'>
                  <div className='flex items-center justify-between w-full'>
                    <p className='text-base font-black leading-none text-gray-800'>
                      {item.name}
                    </p>
                    <div className='flex items-center'>
                      <button
                        className='border rounded-md py-2 px-4 mr-2'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }>
                        -
                      </button>
                      <span className='text-center w-8'>{item.quantity}</span>
                      <button
                        className='border rounded-md py-2 px-4 mr-2'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }>
                        +
                      </button>
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-5'>
                    <div className='flex itemms-center'>
                      <p className='text-xs leading-3 underline text-gray-800 cursor-pointer'>
                        Add to favorites
                      </p>
                      <p
                        className='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'
                        onClick={() => {
                          removeFromCart(item.id);
                        }}>
                        Remove
                      </p>
                    </div>
                    <p className='text-base font-black leading-none text-gray-800'>
                      ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href='/products'
              className='flex font-semibold text-indigo-600 text-sm mt-10'>
              <svg
                className='fill-current mr-2 text-indigo-600 w-4'
                viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id='summary'
            className=' w-full   sm:w-1/4   md:w-1/2     px-8 py-10'>
            <h1 className='font-semibold text-2xl border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>
                Items {cart.length}
              </span>
              <span className='font-semibold text-sm'>${total.toFixed(2)}</span>
            </div>
            <div className='py-10'>
              <label className='font-semibold inline-block mb-3 text-sm uppercase'>
                Promo Code
              </label>
              <input
                type='text'
                id='promo'
                placeholder='Enter your code'
                className='p-2 text-sm w-full'
              />
            </div>
            <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
              Apply
            </button>
            <div className='border-t mt-8'>
              <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                <span>Total cost</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

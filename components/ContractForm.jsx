import Link from "next/link";

const ContractForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Create New Job</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Create New Job
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Name{" "}
          </span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            type='text'
            placeholder='Name'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Address
          </span>
          <input
            value={post.address}
            onChange={(e) => setPost({ ...post, address: e.target.value })}
            type='text'
            placeholder='Address'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Phone Number{" "}
          </span>
          <input
            value={post.phoneNumber}
            onChange={(e) => setPost({ ...post, phoneNumber: e.target.value })}
            type='text'
            placeholder='Phone Number'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Add to Existing Customer{" "}
          </span>
          <input
            value={post.customer_id}
            onChange={(e) => setPost({ ...post, customer_id: e.target.value })}
            type='text'
            placeholder='Customer'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `Creating...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContractForm;
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Create Task</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Create Task
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Task
          </span>

          <textarea
            value={post.task || ''}
            onChange={(e) => setPost({ ...post, task: e.target.value })}
            placeholder='Task description here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Priority Level{" "}
            <span className='font-normal'>
              (High,Medium,Low)
            </span>
          </span>
          <input
            value={post.priority|| ''}
            onChange={(e) => setPost({ ...post, priority: e.target.value })}
            type='text'
            placeholder='Priority'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Assignee{" "}
          </span>
          <input
            value={post.assignee|| ''}
            onChange={(e) => setPost({ ...post, assignee: e.target.value })}
            type='text'
            placeholder='Name'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Customer{" "}
          </span>
          <input
            value={post.customer|| ''}
            onChange={(e) => setPost({ ...post, customer: e.target.value })}
            type='text'
            placeholder='Name'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Notes{" "}
          </span>
          <input
            value={post.note|| ''}
            onChange={(e) => setPost({ ...post, note: e.target.value })}
            type='text'
            placeholder='Input notes here'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Due Date{" "}
          </span>
          <input
            value={post.dueDate|| ''}
            onChange={(e) => setPost({ ...post, dueDate: e.target.value })}
            type='text'
            placeholder='Due Date'
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

export default Form;
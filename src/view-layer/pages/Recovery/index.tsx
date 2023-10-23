import { useForm } from "react-hook-form";
import { withAuthLayout } from "@view/layouts/AuthLayout";
import { useNavigate } from "react-router";

const Recovery = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ email: string }>({
    shouldUseNativeValidation: true,
  });

  const submit = ({ email: string }) => navigate("/login");

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Recovery your account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@skyway.com"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Recovery
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuthLayout(withAuthLayout(Recovery));

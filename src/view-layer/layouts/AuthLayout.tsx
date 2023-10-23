import { ComponentType, PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => (
  <section className="h-screen bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {children}
    </div>
  </section>
);

export const withAuthLayout =
  <P extends object>(Component: ComponentType<P>) =>
  (Props: P) =>
    (
      <AuthLayout>
        <Component {...Props} />
      </AuthLayout>
    );

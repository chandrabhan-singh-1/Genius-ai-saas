"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn-ui/ui/card";

const testimonials = [
  {
    name: "Chandrabhan Singh",
    avatar: "A",
    title: "Software Engineer",
    description:
      "Genius has truly lived up to its name. This AI software has transformed the way we work and think about data. It's not just a tool; it's a game-changer. The insights and solutions it provides are nothing short of genius!",
  },
  {
    name: "Rachit Kabra",
    avatar: "A",
    title: "HR Manager",
    description:
      "Efficiency has reached new heights with Genius. It has automated our processes, reduced manual work, and enhanced accuracy. The time and resources saved can now be channeled into innovation and growth.",
  },
  {
    name: "Vidisha Tiwari",
    avatar: "A",
    title: "Chartered Accountant",
    description:
      "Genius is like having a wizard in your software stack. It seems to conjure up solutions to problems we didn't even know we had. Its adaptability and versatility make it an invaluable asset to our team.",
  },
  {
    name: "Rohan Sharma",
    avatar: "A",
    title: "Doctor",
    description:
      "Genius has acted as a catalyst for innovation within our organization. It has empowered our team to explore new possibilities, experiment with data, and discover insights that have driven our products and services to new heights.",
  },
  // {
  //   name: "Deepesh Suthar",
  //   avatar: "A",
  //   title: "Accounting Manager",
  //   description:
  //     "Investing in Genius is like putting your ROI on steroids. The returns we've seen in terms of productivity, cost savings, and business growth have been nothing short of spectacular. It's an investment that pays for itself.",
  // },
  // {
  //   name: "Nikita Kapoor",
  //   avatar: "A",
  //   title: "Frontend Developer",
  //   description:
  //     "Beyond the software, the Genius team deserves applause. Their commitment to customer success is evident in their excellent support and training programs. They're always there to ensure we harness the full potential of this remarkable software.",
  // },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center mx-auto w-fit text-4xl text-white font-extrabold mb-10 border-b-2">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white mx-1 my-3 md:mx-3 lg:m-4"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="mx-auto">
                  <p className=" text-lg text-center">{item.name}</p>
                  <p className=" text-zinc-400 text-sm text-center">
                    {item.title}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {item.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;

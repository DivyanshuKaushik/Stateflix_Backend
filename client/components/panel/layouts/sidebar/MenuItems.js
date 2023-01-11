const Menuitems = [
  {
    title: "Dashbaord",
    icon: "home",
    href: "/panel",
    roles:["admin","editor","reporter"]
  },
  {
    title: "Posts",
    icon: "file",
    href: "/panel/posts",
    roles:["admin","editor","reporter"]
  },
  {
    title: "Posts Draft",
    icon: "archive",
    href: "/panel/drafts",
    roles:["admin","editor"]
  },
  {
    title: "Polls",
    icon: "bar-chart-2",
    href: "/panel/polls",
    roles:["admin","editor"]
  },
  {
    title: "Trending",
    icon: "trending-up",
    href: "/panel/trending",
    roles:["admin","editor"]
  },
  {
    title: "Ads",
    icon: "image",
    href: "/panel/ads",
    roles:["admin"]
  },
  {
    title: "Categories",
    icon: "hash",
    href: "/panel/categories",
    roles:["admin","editor"]
  },
  {
    title: "Users",
    icon: "users",
    href: "/panel/users",
    roles:["admin"]
  },
  {
    title: "Publisher",
    icon: "cloud",
    href: "/panel/publisher",
    roles:["admin","editor"]
  },
];

export default Menuitems;

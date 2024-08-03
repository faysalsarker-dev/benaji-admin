
import {
  Card,
  Typography,
  CardBody,
  Avatar,
} from "@material-tailwind/react";

export function Allpost() {
  const TABLE_ROWS = [
    {
      name: 'Example 1',
      link: '/post/1',
      img: 'https://via.placeholder.com/150'
    },
    {
      name: 'Example 2',
      link: '/post/2',
      img: 'https://via.placeholder.com/150'
    },
    {
      name: 'Example 3',
      link: '/post/3',
      img: 'https://via.placeholder.com/150'
    },
  ];

  return (
    <Card className="h-full w-full shadow-lg">
      <CardBody className="overflow-scroll px-4">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          All Posts
        </Typography>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="p-4 border-b-2 border-blue-gray-50">Name</th>
              <th className="p-4 border-b-2 border-blue-gray-50">Link</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, link, img }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name} className="hover:bg-blue-gray-50 transition-colors">
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={img}
                        alt={name}
                        size="lg"
                        className="rounded-lg shadow-sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <a href={link} target="_blank">
                      <Typography
                        variant="small"
                        color="blue"
                        className="font-medium underline"
                      >
                        View
                      </Typography>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export async function getFilePage() {
  return {
    list: [
      {
        id: "1",
        name: "XX文件.jpg",
        size: 1024,
        createAt: "2001-02-03 03:03:04",
        url: "http://baiud.com",
        type: 1,
      },
    ],
    query: {
      number: 1,
      size: 10,
    },
    total: 11,
  };
}

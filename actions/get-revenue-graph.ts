import prismadb from "@/lib/prismadb";

type GraphData = {
  name: string;
  total: number;
};

export async function getRevenurGraph(storeId: string) {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const paidOrder of paidOrders) {
    const month = paidOrder.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const orderItem of paidOrder.orderItems) {
      revenueForOrder += orderItem.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Arp", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dev", total: 0 },
  ];

  for (const monthRevenue in monthlyRevenue) {
    graphData[parseInt(monthRevenue)].total =
      monthlyRevenue[parseInt(monthRevenue)];
  }
  return graphData;
}

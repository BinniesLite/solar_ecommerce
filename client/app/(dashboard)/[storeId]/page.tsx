import prismaDB from "@/lib/prisma";

interface DashboardPageProps {
  params: {storeId: string}
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId
    }
  });


  return (
    <div>
      Active Page: {store?.name}
    </div>
  )
}

export default DashboardPage
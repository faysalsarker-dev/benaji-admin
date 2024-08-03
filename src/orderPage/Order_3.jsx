






import { TabsBer } from "../component/TabsBer";
import useFetchData from "../Hook/useFetchData";
import OrderTable from "../Order/OrderTable";
import { ScaleLoader } from 'react-spinners';

const Order_3 = () => {
    const { data: pendingOrders, isLoading: isPendingLoading } = useFetchData('/pending-order-3', 'Order-pending-3');
    const { data: confirmOrders, isLoading: isConfirmLoading } = useFetchData('/confirm-order-3', 'Order-confirm-3');

    const tabsData = [
        {
            label: "Running Order",
            Component: () => <OrderTable data={pendingOrders} />,
        },
        {
            label: "Confirm Order",
            Component: () => <OrderTable data={confirmOrders} />,
        },
    ];

    if (isPendingLoading || isConfirmLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <ScaleLoader color="green" />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-center text-3xl font-extrabold my-4 border-b-2 pb-2 border-green-500">
                Order 2 Page
            </h2>
            <TabsBer data={tabsData} />
        </div>
    );
};

export default Order_3;

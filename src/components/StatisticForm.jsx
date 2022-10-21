import React from 'react';

const StatisticForm = ({currentCurr, yesterdayCurrency, weekAgoCurrency}) => {
    return (
        <div>
            <div
                className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <div className="divide-y divide-gray-300/50">
                        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/893/893336.png" alt=""
                                         className="h-6"/>
                                    <p className="ml-4">Currency index: <strong>{currentCurr.cc}</strong></p>
                                </li>
                                <li className="flex items-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1/1437.png" alt=""
                                         className="h-6"/>
                                    <p className="ml-4">
                                        Currency exchange rate against UAH: <strong>{currentCurr.rate}</strong>
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2672/2672219.png" alt=""
                                         className="h-6"/>
                                    <p className="ml-4">Currency exchange
                                        date: <strong>{currentCurr.exchangedate}</strong></p>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-8 text-base font-semibold leading-7">
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <p className="ml-4">Yesterday {yesterdayCurrency}<span
                                        className="ml-40">{(currentCurr.rate - yesterdayCurrency).toFixed(5)}</span>
                                    </p>
                                    {(currentCurr.rate - yesterdayCurrency) === 0 ?
                                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png"
                                             alt="" className="h-6  ml-2"/> :
                                        (currentCurr.rate - yesterdayCurrency) > 0 ?
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png"
                                                 alt="" className="h-6  ml-2"/> :
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png"
                                                 alt="" className="h-6"/>
                                    }
                                </li>
                                <li className="flex items-center">
                                    <p className="ml-4">Week ago {weekAgoCurrency}<span
                                        className="ml-40">{(currentCurr.rate - weekAgoCurrency).toFixed(5)}</span>
                                    </p>
                                    {(currentCurr.rate - weekAgoCurrency) === 0 ?
                                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png"
                                             alt="" className="h-6  ml-2"/> :
                                        (currentCurr.rate - weekAgoCurrency) > 0 ?
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148312.png"
                                                 alt="" className="h-6 ml-2"/> :
                                            <img src="https://cdn-icons-png.flaticon.com/512/3148/3148295.png"
                                                 alt="" className="h-6 ml-2"/>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticForm;
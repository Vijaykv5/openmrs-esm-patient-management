import { useEffect, useState } from 'react';
import { getGlobalStore } from '@openmrs/esm-framework';
import type { AppointmentSummary } from '../types';
import { useTranslation } from 'react-i18next';

export const getServiceCountByAppointmentType = (
  appointmentSummary: Array<AppointmentSummary>,
  appointmentType: string,
) => {
  return appointmentSummary
    .map((appointment) =>
      Object.entries(appointment.appointmentCountMap).flatMap((appointment) => appointment[1][appointmentType]),
    )
    .flat(1)
    .reduce((count, val) => count + val, 0);
};

const initialServiceNameState = { serviceName: sessionStorage.getItem('queueServiceName') };
const initialServiceUuidState = { serviceUuid: sessionStorage.getItem('queueServiceUuid') };
const intialStatusNameState = { status: '' };
const initialQueueLocationNameState = { queueLocationName: sessionStorage.getItem('queueLocationName') };
const initialQueueLocationUuidState = { queueLocationUuid: sessionStorage.getItem('queueLocationUuid') };
const initialSelectedQueueRoomTimestamp = { providerQueueRoomTimestamp: new Date() };
const initialPermanentProviderQueueRoomState = {
  isPermanentProviderQueueRoom: sessionStorage.getItem('isPermanentProviderQueueRoom'),
};

export function getSelectedServiceName() {
  return getGlobalStore<{ serviceName: string }>('queueSelectedServiceName', initialServiceNameState);
}

export function getSelectedServiceUuid() {
  return getGlobalStore<{ serviceUuid: string }>('queueSelectedServiceUuid', initialServiceUuidState);
}

export function getSelectedAppointmentStatus() {
  return getGlobalStore<{ status: string }>('appointmentSelectedStatus', intialStatusNameState);
}

export function getSelectedQueueLocationName() {
  return getGlobalStore<{ queueLocationName: string }>('queueLocationNameSelected', initialQueueLocationNameState);
}

export function getSelectedQueueLocationUuid() {
  return getGlobalStore<{ queueLocationUuid: string }>('queueLocationUuidSelected', initialQueueLocationUuidState);
}

export function getSelectedQueueRoomTimestamp() {
  return getGlobalStore<{ providerQueueRoomTimestamp: Date }>(
    'queueProviderRoomTimestamp',
    initialSelectedQueueRoomTimestamp,
  );
}

export function getIsPermanentProviderQueueRoom() {
  return getGlobalStore<{ isPermanentProviderQueueRoom: string }>(
    'isPermanentProviderQueueRoom',
    initialPermanentProviderQueueRoomState,
  );
}

export const updateSelectedServiceName = (currentServiceName: string) => {
  const store = getSelectedServiceName();
  sessionStorage.setItem('queueServiceName', currentServiceName);
  store.setState({ serviceName: currentServiceName });
};

export const updateSelectedServiceUuid = (currentServiceUuid: string) => {
  const store = getSelectedServiceUuid();
  sessionStorage.setItem('queueServiceUuid', currentServiceUuid);
  store.setState({ serviceUuid: currentServiceUuid });
};

export const updateSelectedAppointmentStatus = (currentAppointmentStatus: string) => {
  const store = getSelectedAppointmentStatus();
  store.setState({ status: currentAppointmentStatus });
};

export const updateSelectedQueueLocationName = (currentLocationName: string) => {
  const store = getSelectedQueueLocationName();
  sessionStorage.setItem('queueLocationName', currentLocationName);
  store.setState({ queueLocationName: currentLocationName });
};

export const updateSelectedQueueLocationUuid = (currentLocationUuid: string) => {
  const store = getSelectedQueueLocationUuid();
  sessionStorage.setItem('queueLocationUuid', currentLocationUuid);
  store.setState({ queueLocationUuid: currentLocationUuid });
};

export const updatedSelectedQueueRoomTimestamp = (currentProviderRoomTimestamp: Date) => {
  const store = getSelectedQueueRoomTimestamp();
  store.setState({ providerQueueRoomTimestamp: currentProviderRoomTimestamp });
};

export const updateIsPermanentProviderQueueRoom = (currentIsPermanentProviderQueueRoom) => {
  const store = getIsPermanentProviderQueueRoom();
  sessionStorage.setItem('isPermanentProviderQueueRoom', currentIsPermanentProviderQueueRoom);
  store.setState({ isPermanentProviderQueueRoom: currentIsPermanentProviderQueueRoom });
};

export const useSelectedServiceName = () => {
  const { t } = useTranslation();
  const [currentServiceName, setCurrentServiceName] = useState(initialServiceNameState.serviceName ?? t('all', 'All'));

  useEffect(() => {
    getSelectedServiceName().subscribe(({ serviceName }) => setCurrentServiceName(serviceName));
  }, []);

  return currentServiceName;
};

export const useSelectedServiceUuid = () => {
  const [currentServiceUuid, setCurrentServiceUuid] = useState(initialServiceUuidState.serviceUuid);

  useEffect(() => {
    getSelectedServiceUuid().subscribe(({ serviceUuid }) => setCurrentServiceUuid(serviceUuid));
  }, []);
  return currentServiceUuid;
};

export const useSelectedAppointmentStatus = () => {
  const [currentAppointmentStatus, setCurrentAppointmentStatus] = useState(intialStatusNameState.status);

  useEffect(() => {
    getSelectedAppointmentStatus().subscribe(({ status }) => setCurrentAppointmentStatus(status));
  }, []);
  return currentAppointmentStatus;
};

export const useSelectedQueueLocationName = () => {
  const [currentQueueLocationName, setCurrentQueueLocationName] = useState(
    initialQueueLocationNameState.queueLocationName,
  );

  useEffect(() => {
    getSelectedQueueLocationName().subscribe(({ queueLocationName }) => setCurrentQueueLocationName(queueLocationName));
  }, []);
  return currentQueueLocationName;
};

export const useSelectedQueueLocationUuid = () => {
  const [currentQueueLocationUuid, setCurrentQueueLocationUuid] = useState(
    initialQueueLocationUuidState.queueLocationUuid,
  );

  useEffect(() => {
    getSelectedQueueLocationUuid().subscribe(({ queueLocationUuid }) => setCurrentQueueLocationUuid(queueLocationUuid));
  }, []);
  return currentQueueLocationUuid;
};

export const useSelectedProviderRoomTimestamp = () => {
  const [currentProviderRoomTimestamp, setCurrentProviderRoomTimestamp] = useState(
    initialSelectedQueueRoomTimestamp.providerQueueRoomTimestamp,
  );

  useEffect(() => {
    getSelectedQueueRoomTimestamp().subscribe(({ providerQueueRoomTimestamp }) =>
      setCurrentProviderRoomTimestamp(providerQueueRoomTimestamp),
    );
  }, []);
  return currentProviderRoomTimestamp;
};

export const useIsPermanentProviderQueueRoom = () => {
  const [currentIsPermanentProviderQueueRoom, setCurrentIsPermanentProviderQueueRoom] = useState(
    initialPermanentProviderQueueRoomState.isPermanentProviderQueueRoom,
  );

  useEffect(() => {
    getIsPermanentProviderQueueRoom().subscribe(({ isPermanentProviderQueueRoom }) =>
      setCurrentIsPermanentProviderQueueRoom(isPermanentProviderQueueRoom),
    );
  }, []);
  return currentIsPermanentProviderQueueRoom;
};

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import RequestTypesManager from './RequestTypesManager';

interface Request {
  id: string;
  type: 'lighting' | 'traffic' | 'heat' | 'water' | 'elevator';
  title: string;
  address: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'completed';
  time: string;
  points: number;
}

interface UserProfile {
  name: string;
  level: number;
  reputation: number;
  completedRequests: number;
  currentLevelProgress: number;
}

const mockRequests: Request[] = [
  {
    id: '1',
    type: 'lighting',
    title: 'Не работает уличное освещение',
    address: 'ул. Тверская, д. 15',
    priority: 'high',
    status: 'new',
    time: '10:30',
    points: 50
  },
  {
    id: '2',
    type: 'traffic',
    title: 'Сбой в работе светофора',
    address: 'Садовое кольцо, Маяковская',
    priority: 'urgent',
    status: 'new',
    time: '10:15',
    points: 100
  },
  {
    id: '3',
    type: 'heat',
    title: 'Отсутствует отопление в доме',
    address: 'Ленинский проспект, д. 42',
    priority: 'urgent',
    status: 'in_progress',
    time: '09:45',
    points: 80
  },
  {
    id: '4',
    type: 'water',
    title: 'Протечка водопровода',
    address: 'ул. Арбат, д. 28',
    priority: 'medium',
    status: 'new',
    time: '08:30',
    points: 40
  },
  {
    id: '5',
    type: 'elevator',
    title: 'Застрял лифт в подъезде',
    address: 'Кутузовский проспект, д. 67',
    priority: 'high',
    status: 'completed',
    time: '07:20',
    points: 60
  }
];

const MoscowGKHDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  
  const userProfile: UserProfile = {
    name: 'Диспетчер Москвы',
    level: 8,
    reputation: 2450,
    completedRequests: 127,
    currentLevelProgress: 65
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'lighting': return 'Lightbulb';
      case 'traffic': return 'Traffic';
      case 'heat': return 'Thermometer';
      case 'water': return 'Droplets';
      case 'elevator': return 'ArrowUpDown';
      default: return 'AlertCircle';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestAction = (requestId: string, action: 'accept' | 'complete') => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        if (action === 'accept') {
          return { ...req, status: 'in_progress' };
        } else if (action === 'complete') {
          return { ...req, status: 'completed' };
        }
      }
      return req;
    }));
  };

  const newRequestsCount = requests.filter(r => r.status === 'new').length;
  const inProgressCount = requests.filter(r => r.status === 'in_progress').length;
  const completedToday = requests.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="services">Службы</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Симулятор ЖКХ Москвы
              </h1>
              <p className="text-gray-600">Диспетчерская служба города</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Текущее время</p>
              <p className="text-2xl font-bold text-primary">10:45</p>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                  <p className="text-gray-600">Уровень {userProfile.level}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-600">
                      Репутация: <span className="font-semibold text-primary">{userProfile.reputation}</span>
                    </span>
                    <span className="text-sm text-gray-600">
                      Выполнено: <span className="font-semibold">{userProfile.completedRequests}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">Прогресс до следующего уровня</p>
                <Progress value={userProfile.currentLevelProgress} className="w-48" />
                <p className="text-xs text-gray-500 mt-1">{userProfile.currentLevelProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="AlertCircle" className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Новые заявки</p>
                  <p className="text-2xl font-bold text-blue-600">{newRequestsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Clock" className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">В работе</p>
                  <p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="CheckCircle" className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Выполнено сегодня</p>
                  <p className="text-2xl font-bold text-green-600">{completedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="TrendingUp" className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Рейтинг дня</p>
                  <p className="text-2xl font-bold text-primary">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="List" className="mr-2" />
              Активные заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={getRequestIcon(request.type)} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{request.title}</h4>
                        <p className="text-sm text-gray-600">{request.address}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getPriorityColor(request.priority)}>
                            {request.priority === 'urgent' ? 'Срочно' : 
                             request.priority === 'high' ? 'Важно' :
                             request.priority === 'medium' ? 'Средне' : 'Низко'}
                          </Badge>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status === 'new' ? 'Новая' :
                             request.status === 'in_progress' ? 'В работе' : 'Выполнена'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{request.time}</p>
                      <p className="text-lg font-bold text-primary">+{request.points} 🏆</p>
                      {request.status === 'new' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(request.id, 'accept');
                          }}
                          className="mt-2"
                        >
                          Принять
                        </Button>
                      )}
                      {request.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestAction(request.id, 'complete');
                          }}
                          className="mt-2"
                        >
                          Завершить
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Детали заявки #{selectedRequest.id}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRequest(null)}
                  >
                    <Icon name="X" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{selectedRequest.title}</h4>
                    <p className="text-gray-600">{selectedRequest.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(selectedRequest.priority)}>
                      {selectedRequest.priority === 'urgent' ? 'Срочно' : 
                       selectedRequest.priority === 'high' ? 'Важно' :
                       selectedRequest.priority === 'medium' ? 'Средне' : 'Низко'}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status === 'new' ? 'Новая' :
                       selectedRequest.status === 'in_progress' ? 'В работе' : 'Выполнена'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Время поступления: {selectedRequest.time}</p>
                    <p className="text-sm text-gray-600">Награда: +{selectedRequest.points} репутации</p>
                  </div>
                  {selectedRequest.status === 'new' && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleRequestAction(selectedRequest.id, 'accept');
                        setSelectedRequest(null);
                      }}
                    >
                      Принять заявку
                    </Button>
                  )}
                  {selectedRequest.status === 'in_progress' && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleRequestAction(selectedRequest.id, 'complete');
                        setSelectedRequest(null);
                      }}
                    >
                      Завершить работу
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
          </TabsContent>

          <TabsContent value="services">
            <RequestTypesManager />
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Игровой профиль</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={40} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                        <p className="text-gray-600">Главный диспетчер Москвы</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-lg font-semibold text-primary">
                            Уровень {userProfile.level}
                          </span>
                          <span className="text-lg font-semibold text-secondary">
                            {userProfile.reputation} репутации
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Прогресс до уровня {userProfile.level + 1}
                      </p>
                      <Progress value={userProfile.currentLevelProgress} className="w-full" />
                      <p className="text-xs text-gray-500 mt-1">
                        {userProfile.currentLevelProgress}% до следующего уровня
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">{userProfile.completedRequests}</p>
                        <p className="text-sm text-gray-600">Выполнено заявок</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-3xl font-bold text-green-600">95%</p>
                        <p className="text-sm text-gray-600">Рейтинг качества</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-3xl font-bold text-purple-600">12</p>
                        <p className="text-sm text-gray-600">Дней подряд</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Достижения</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl mb-2">🏆</div>
                          <p className="text-xs font-medium">Герой Города</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl mb-2">⚡</div>
                          <p className="text-xs font-medium">Быстрая реакция</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <p className="text-xs font-medium">Точность 100%</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg opacity-50">
                          <div className="text-2xl mb-2">🌟</div>
                          <p className="text-xs font-medium">Мастер</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MoscowGKHDashboard;
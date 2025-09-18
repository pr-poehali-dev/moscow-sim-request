import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ServiceDepartment {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  responseTime: string;
  efficiency: number;
  availableTeams: number;
}

interface ExtendedRequest {
  id: string;
  type: string;
  title: string;
  address: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'assigned' | 'in_progress' | 'completed';
  time: string;
  points: number;
  department: string;
  estimatedTime: string;
  difficulty: number;
  citizenRating: number;
}

const serviceDepartments: ServiceDepartment[] = [
  {
    id: 'lighting',
    name: 'Освещение',
    icon: 'Lightbulb',
    color: 'bg-yellow-500',
    description: 'Управление уличным и внутридомовым освещением',
    responseTime: '2-4 часа',
    efficiency: 85,
    availableTeams: 12
  },
  {
    id: 'traffic',
    name: 'ЦОДД (Светофоры)',
    icon: 'Traffic',
    color: 'bg-red-500',
    description: 'Центр организации дорожного движения',
    responseTime: '30 мин',
    efficiency: 95,
    availableTeams: 8
  },
  {
    id: 'heating',
    name: 'Теплоснабжение',
    icon: 'Thermometer',
    color: 'bg-orange-500',
    description: 'Системы отопления и горячего водоснабжения',
    responseTime: '1-2 часа',
    efficiency: 78,
    availableTeams: 15
  },
  {
    id: 'water',
    name: 'Водоканал',
    icon: 'Droplets',
    color: 'bg-blue-500',
    description: 'Водопровод и канализация',
    responseTime: '1-3 часа',
    efficiency: 82,
    availableTeams: 10
  },
  {
    id: 'elevator',
    name: 'Лифтовое хозяйство',
    icon: 'ArrowUpDown',
    color: 'bg-purple-500',
    description: 'Обслуживание лифтового оборудования',
    responseTime: '45 мин',
    efficiency: 88,
    availableTeams: 6
  },
  {
    id: 'emergency',
    name: 'Аварийная служба',
    icon: 'AlertTriangle',
    color: 'bg-red-600',
    description: 'Экстренное реагирование на аварии',
    responseTime: '15 мин',
    efficiency: 92,
    availableTeams: 20
  }
];

const extendedRequests: ExtendedRequest[] = [
  {
    id: '1',
    type: 'lighting',
    title: 'Не работает уличное освещение',
    address: 'ул. Тверская, д. 15',
    priority: 'high',
    status: 'new',
    time: '10:30',
    points: 50,
    department: 'lighting',
    estimatedTime: '3 часа',
    difficulty: 3,
    citizenRating: 4.2
  },
  {
    id: '2',
    type: 'traffic',
    title: 'Сбой в работе светофора',
    address: 'Садовое кольцо, Маяковская',
    priority: 'urgent',
    status: 'assigned',
    time: '10:15',
    points: 100,
    department: 'traffic',
    estimatedTime: '30 мин',
    difficulty: 5,
    citizenRating: 4.8
  },
  {
    id: '3',
    type: 'heating',
    title: 'Отсутствует отопление в доме',
    address: 'Ленинский проспект, д. 42',
    priority: 'urgent',
    status: 'in_progress',
    time: '09:45',
    points: 80,
    department: 'heating',
    estimatedTime: '2 часа',
    difficulty: 4,
    citizenRating: 4.5
  }
];

const RequestTypesManager: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [requests, setRequests] = useState<ExtendedRequest[]>(extendedRequests);

  const assignRequest = (requestId: string, departmentId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'assigned', department: departmentId }
        : req
    ));
  };

  const getDepartmentById = (id: string) => 
    serviceDepartments.find(dept => dept.id === id);

  const getRequestsByDepartment = (departmentId: string) =>
    requests.filter(req => req.department === departmentId);

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
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Управление службами ЖКХ
        </h2>
        <p className="text-gray-600">
          Координация работы различных служб города
        </p>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">Службы</TabsTrigger>
          <TabsTrigger value="requests">Заявки по типам</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceDepartments.map((department) => {
              const departmentRequests = getRequestsByDepartment(department.id);
              const activeRequests = departmentRequests.filter(r => r.status !== 'completed').length;
              
              return (
                <Card key={department.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full ${department.color} flex items-center justify-center`}>
                        <Icon name={department.icon} className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{department.name}</CardTitle>
                        <p className="text-sm text-gray-600">
                          Время отклика: {department.responseTime}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {department.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Эффективность:</span>
                        <span className="font-semibold">{department.efficiency}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Активные заявки:</span>
                        <span className="font-semibold text-primary">{activeRequests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Доступно бригад:</span>
                        <span className="font-semibold">{department.availableTeams}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => setSelectedDepartment(department.id)}
                    >
                      Управлять службой
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="grid gap-4">
            {requests.map((request) => {
              const department = getDepartmentById(request.department);
              
              return (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${department?.color} flex items-center justify-center`}>
                          <Icon name={department?.icon || 'AlertCircle'} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.title}</h4>
                          <p className="text-sm text-gray-600">{request.address}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={getPriorityColor(request.priority)}>
                              {request.priority === 'urgent' ? 'Срочно' : 
                               request.priority === 'high' ? 'Важно' :
                               request.priority === 'medium' ? 'Средне' : 'Низко'}
                            </Badge>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status === 'new' ? 'Новая' :
                               request.status === 'assigned' ? 'Назначена' :
                               request.status === 'in_progress' ? 'В работе' : 'Выполнена'}
                            </span>
                            <Badge variant="outline">
                              {department?.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>🕐 {request.estimatedTime}</span>
                          <span>⭐ {request.citizenRating}/5</span>
                          <span>🎯 Сложность: {request.difficulty}/5</span>
                        </div>
                        <p className="text-lg font-bold text-primary">+{request.points} 🏆</p>
                        
                        {request.status === 'new' && (
                          <div className="flex space-x-2">
                            {serviceDepartments.slice(0, 3).map((dept) => (
                              <Button
                                key={dept.id}
                                size="sm"
                                variant="outline"
                                onClick={() => assignRequest(request.id, dept.id)}
                              >
                                → {dept.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon name="Clock" className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Среднее время решения</p>
                    <p className="text-2xl font-bold text-blue-600">2.3 часа</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon name="TrendingUp" className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Удовлетворенность</p>
                    <p className="text-2xl font-bold text-green-600">4.6/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon name="Users" className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Активных бригад</p>
                    <p className="text-2xl font-bold text-purple-600">71</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon name="Award" className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Рейтинг города</p>
                    <p className="text-2xl font-bold text-yellow-600">А+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Эффективность служб</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceDepartments.map((department) => (
                  <div key={department.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full ${department.color} flex items-center justify-center`}>
                        <Icon name={department.icon} className="text-white" size={16} />
                      </div>
                      <span className="font-medium">{department.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${department.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-sm w-12 text-right">
                        {department.efficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestTypesManager;
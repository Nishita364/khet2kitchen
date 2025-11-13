'use client';

import { useState, useEffect } from 'react';
import { Calendar, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DiseaseDetectionResult } from '@/lib/ml/plant-disease-detector';

interface DiseaseRecord extends DiseaseDetectionResult {
  id: string;
  timestamp: Date;
  cropType?: string;
  fieldLocation?: string;
}

interface DiseaseHistoryProps {
  newResult?: DiseaseDetectionResult;
}

export function DiseaseHistory({ newResult }: DiseaseHistoryProps) {
  const [records, setRecords] = useState<DiseaseRecord[]>([]);

  // Load records from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('disease-detection-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp)
        }));
        setRecords(parsed);
      } catch (error) {
        console.error('Failed to load disease history:', error);
      }
    }
  }, []);

  // Add new result to history
  useEffect(() => {
    if (newResult) {
      const newRecord: DiseaseRecord = {
        ...newResult,
        id: Date.now().toString(),
        timestamp: new Date(),
        cropType: 'Unknown', // You can enhance this to detect crop type
        fieldLocation: 'Field 1' // You can enhance this with GPS location
      };

      const updatedRecords = [newRecord, ...records].slice(0, 50); // Keep last 50 records
      setRecords(updatedRecords);
      
      // Save to localStorage
      localStorage.setItem('disease-detection-history', JSON.stringify(updatedRecords));
    }
  }, [newResult, records]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStats = () => {
    if (records.length === 0) return null;

    const healthy = records.filter(r => r.disease === 'Healthy').length;
    const diseased = records.length - healthy;
    const highSeverity = records.filter(r => r.severity === 'high').length;

    return {
      healthy,
      diseased,
      highSeverity,
      healthPercentage: Math.round((healthy / records.length) * 100)
    };
  };

  const stats = getHealthStats();

  const clearHistory = () => {
    setRecords([]);
    localStorage.removeItem('disease-detection-history');
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Healthy Plants</p>
                  <p className="text-2xl font-bold text-green-600">{stats.healthy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Diseased Plants</p>
                  <p className="text-2xl font-bold text-red-600">{stats.diseased}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Health Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.healthPercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                  <p className="text-2xl font-bold text-purple-600">{records.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Detection History</CardTitle>
          {records.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              Clear History
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No disease detection records yet.</p>
              <p className="text-sm">Start scanning plants to see your history here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{record.disease}</h3>
                      <Badge className={getSeverityColor(record.severity)}>
                        {record.severity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Confidence: {(record.confidence * 100).toFixed(1)}%
                    </p>
                    
                    <p className="text-sm bg-blue-50 p-2 rounded">
                      {record.treatment}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{record.timestamp.toLocaleDateString()}</span>
                      <span>{record.timestamp.toLocaleTimeString()}</span>
                      {record.cropType && <span>Crop: {record.cropType}</span>}
                      {record.fieldLocation && <span>Location: {record.fieldLocation}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
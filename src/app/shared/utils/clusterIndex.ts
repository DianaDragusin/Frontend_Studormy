import {ClustersEnum} from "./cluster.enum";


export function getClusterName(clusterIndex: number): string {
  switch (clusterIndex) {
    case 0:
      return ClustersEnum.cluster0;
    case 1:
      return ClustersEnum.cluster1;
    case 2:
      return ClustersEnum.cluster2;
    case 3:
      return ClustersEnum.cluster3;
    case 4:
      return ClustersEnum.cluster4;
    default:
      return ClustersEnum.cluster3;
  }
}

import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table  } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixfromStack } from '../Utils';


export class DataStack extends Stack {
  public readonly spacesTable: ITable;
  public readonly seriesTable: ITable;
  public readonly productTable: ITable;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const suffix = getSuffixfromStack(this);
    this.spacesTable = new Table(this, 'SpacesTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: `SpaceTable-${suffix}`
    })   
    this.seriesTable = new Table(this, 'SeriesTable', {
      partitionKey: {
        name: 'serie',
        type: AttributeType.STRING
      },
      tableName: `SeriesTable-${suffix}`
    })
    this.productTable = new Table(this, 'ProductTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: `ProductTable`
    })     
  }
}

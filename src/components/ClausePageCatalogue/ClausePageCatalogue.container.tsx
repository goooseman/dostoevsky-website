import React, { PureComponent } from "react";
import ClausePageCatalogue from "./ClausePageCatalogue";
import ukRf from "content/ук-рф.json";
import { getClauseById } from "src/utils/ук-рф";

interface ClausePageCatalogueContainerProps {
  year: number;
  onClose: () => void;
  clauseId?: number;
}

interface ClausePageCatalogueContainerState {
  activeChapterId?: number;
  activeSectionId?: number;
  activeClauseId?: number;
}

class ClausePageCatalogueContainer extends PureComponent<
  ClausePageCatalogueContainerProps,
  ClausePageCatalogueContainerState
> {
  public constructor(props: ClausePageCatalogueContainerProps) {
    super(props);

    const clauseId = props.clauseId;
    let activeChapterId, activeSectionId, activeClauseId: number | undefined;
    if (clauseId !== undefined) {
      const { part, section } = getClauseById(clauseId);
      activeChapterId = part?.id;
      activeSectionId = section?.id;
      if (section) {
        activeClauseId = clauseId;
      }
    }
    this.state = {
      activeChapterId,
      activeSectionId,
      activeClauseId,
    };
  }

  render(): React.ReactNode {
    const { year, onClose } = this.props;
    const { activeChapterId, activeSectionId, activeClauseId } = this.state;

    const part = activeChapterId
      ? ukRf.find((p) => p.id === activeChapterId)
      : undefined;
    const section =
      part && activeSectionId
        ? part.children.find((s) => s.id === activeSectionId)
        : undefined;

    return (
      <ClausePageCatalogue
        parts={ukRf}
        sections={part?.children}
        clauses={section?.children}
        activeChapterId={activeChapterId}
        activeSectionId={activeSectionId}
        activeClauseId={activeClauseId}
        onPartClick={this.handlePartClick}
        onSectionClick={this.handleSectionClick}
        year={year}
        onClose={onClose}
      ></ClausePageCatalogue>
    );
  }

  private handlePartClick = (id: number) => {
    this.setState({
      activeChapterId: id,
    });
  };

  private handleSectionClick = (id: number) => {
    this.setState({
      activeSectionId: id,
    });
  };
}

export default ClausePageCatalogueContainer;
